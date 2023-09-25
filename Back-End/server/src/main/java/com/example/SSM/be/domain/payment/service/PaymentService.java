package com.example.SSM.be.domain.payment.service;

import com.example.SSM.be.domain.cart.entity.CartItem;
import com.example.SSM.be.domain.cart.service.CartService;
import com.example.SSM.be.domain.member.entity.Member;
import com.example.SSM.be.domain.payment.dto.OrderHistoryDTO;
import com.example.SSM.be.domain.payment.dto.PaymentItemDTO;
import com.example.SSM.be.domain.payment.dto.ProductDTO;
import com.example.SSM.be.domain.payment.entity.Payment;
import com.example.SSM.be.domain.payment.entity.PaymentItem;
import com.example.SSM.be.domain.payment.repository.PaymentRepository;
import com.example.SSM.be.domain.products.entity.Products;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class PaymentService {
    private final PaymentRepository paymentRepository;
    private final CartService cartService;

    @Autowired
    public PaymentService(PaymentRepository paymentRepository, CartService cartService){
        this.paymentRepository = paymentRepository;
        this.cartService = cartService;
    }

    @Transactional
    public Payment createOrder(
            Member member,
            List<CartItem> cartItems,
            List<Long> selectedCartItems,
            String recipientName,
            String address,
            String phone,
            String request) {
        Payment payment = new Payment();
        payment.setMember(member);
        payment.setOrderDate(LocalDateTime.now());
        payment.setRecipientName(recipientName);
        payment.setAddress(address);
        payment.setPhone(phone);
        payment.setRequest(request);

        // Payment 객체를 저장하고 그 후에 paymentid를 조회하여 설정
        Payment savedPayment = paymentRepository.save(payment);

        // paymentid를 가져올 필요 없습니다.
        // Long paymentId = payment.getPaymentId();

        BigDecimal totalAmount = BigDecimal.ZERO;
        List<PaymentItem> paymentItems = new ArrayList<>();

        for (CartItem cartItem : cartItems) {
            if (selectedCartItems.contains(cartItem.getId())) {
                Products product = cartItem.getProducts(); // 상품 정보 가져오기
                int quantity = cartItem.getQuantity();
                BigDecimal price = BigDecimal.valueOf(product.getProductPrice());
                BigDecimal subtotal = price.multiply(BigDecimal.valueOf(quantity));

                PaymentItem paymentItem = new PaymentItem();
                paymentItem.setPayment(savedPayment); // 저장한 Payment를 사용
                paymentItem.setProducts(product); // 상품 정보 설정
                paymentItem.setQuantity(quantity);
                paymentItem.setPrice(price);
                paymentItem.setSubtotal(subtotal);

                paymentItems.add(paymentItem);
                totalAmount = totalAmount.add(subtotal);
            }
        }

        // paymentItems를 Payment에 설정
        savedPayment.setPaymentItems(paymentItems);
        savedPayment.setTotalAmount(totalAmount);

        // 선택된 장바구니 아이템을 장바구니에서 제거
        if (!selectedCartItems.isEmpty()) {
            cartService.removeCartItems(member.getEmail(), selectedCartItems);
        }

        // 수정된 Payment 객체를 반환
        return savedPayment;
    }
    public OrderHistoryDTO getOrderDetails(String email, Long orderId) {
        // 주문 번호(paymentId)를 이용하여 해당 주문 정보를 조회하는 로직을 추가해야 합니다.
        Payment payment = paymentRepository.findByPaymentIdAndMember_Email(orderId, email);

        if (payment == null) {
            // 주문을 찾을 수 없을 경우 null을 반환
            return null;
        }
        // 주문 정보를 OrderHistoryDTO로 변환하여 반환
        return convertToOrderHistoryDTO(payment);
    }

    private OrderHistoryDTO convertToOrderHistoryDTO(Payment payment) {
        OrderHistoryDTO dto = new OrderHistoryDTO();

        // paymentItems 설정
        List<PaymentItemDTO> paymentItems = new ArrayList<>();
        for (PaymentItem paymentItem : payment.getPaymentItems()) {
            PaymentItemDTO paymentItemDTO = new PaymentItemDTO();

            // ProductDTO를 생성하고 설정
            ProductDTO productDTO = new ProductDTO();
            Products product = paymentItem.getProducts();
            productDTO.setProductId(product.getProductId());
            productDTO.setProductName(product.getProductName());
            productDTO.setCategory(product.getCategory());
            productDTO.setImg(product.getImg());
            productDTO.setContent(product.getContent());
            productDTO.setProductDescription(product.getProductDescription());
            productDTO.setRawmaterial(product.getRawmaterial());
            productDTO.setPrecautions(product.getPrecautions());
            productDTO.setManufacturer(product.getManufacturer());
            productDTO.setProductPrice(product.getProductPrice());

            paymentItemDTO.setProducts(productDTO);
            paymentItemDTO.setQuantity(paymentItem.getQuantity());
            paymentItemDTO.setPrice(paymentItem.getPrice());
            paymentItemDTO.setSubtotal(paymentItem.getSubtotal());

            paymentItems.add(paymentItemDTO);
        }
        dto.setPaymentItems(paymentItems);

        return dto;
    }
}
//test