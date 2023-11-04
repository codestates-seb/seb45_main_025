<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>채팅</title>

<link rel="stylesheet" href="/css/main.css">

</head>
<body>
	<!-- 채팅방 목록 -->
	<main>
        <h1>채팅방</h1>
        <button class="new_chat">새 채팅방 만들기</button>
        <nav>
        	<span>방 제목</span>
        	<span>인원</span>
        </nav>
       	<hr>

        <ul>
            <li>
            <!--
				<span class="chat_title"></span>
				<span class="chat_count"></span>
				 -->
            </li>
        </ul>
    </main>
	<!-- 채팅방 목록 -->

	<!-- 채팅방 입장 -->
    <div class="chat">
   		<div>
   			<div class="chat_body">
		        <h2 class="chat_title">1번방</h2>
		        <button class="chat_back">◀</button>

		        <ul class="chat_list">
		            <li>
		            	<!-- <div class="notification">
		            		<span></span>
		            	</div> -->
		            </li>
		        </ul>

		        <div class="chat_input">
		            <div class="chat_input_area">
		                <textarea></textarea>
		            </div>

		            <div class="chat_button_area">
		                <button>전송</button>
		            </div>
		        </div>
	        </div>

	        <div class="chat_users">
	        	<h2>
	        		참가인원
	        		<span class="user"></span>
	        	</h2>

	        	<div class="chat_nickname">
	        		<ul>
	        			<li>
	       				</li>
	        		</ul>
	        	</div>
	        </div>
   		</div>
    </div>
    <!-- 채팅방 입장 -->

    <!-- sock js -->
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.5.2/sockjs.min.js"></script>
	<!-- STOMP -->
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.min.js"></script>

    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script src="/js/main.js"></script>
</body>
</html>
