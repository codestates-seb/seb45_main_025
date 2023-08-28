import { BaseContainer, BaseWrap } from '../../style/Global.styled';
import { MainContainer } from './Main.styled';
export default function Main() {
  return (
    <BaseContainer>
      <BaseWrap>
        <MainContainer>
          <div>메인 페이지</div>
        </MainContainer>
      </BaseWrap>
    </BaseContainer>
  );
}
