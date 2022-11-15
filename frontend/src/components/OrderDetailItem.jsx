import styled from "styled-components";
import { Link } from "react-router-dom";

// components
import { LocalMallIcon, QueryBuilderIcon } from "./Icons";

// constants
import { FONT_SIZE } from "../style_constants";

const LineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AmountText = styled.p`
  font-size: ${FONT_SIZE.STAND_BODY};
  font-weight: bold;
`;

export const OrderDetailItem = ({
  restaurantId,
  restaurantName,
  restaurantFee,
  timeRequired,
  foodCount,
  price,
}) => (
  <>
    {/* バッグのアイコンとレストランリンク */}
    <LineWrapper>
      <LocalMallIcon />
      <Link to={`/restaurants/${restaurantId}/foods`}>{restaurantName}</Link>
    </LineWrapper>

    {/* 時計アイコンと到着時間 */}
    <LineWrapper>
      <QueryBuilderIcon />
      {timeRequired}分で到着予定
    </LineWrapper>

    {/* 商品数 */}
    <LineWrapper>
      <p>商品数:{foodCount}</p>
      <p>¥ {price}</p>
    </LineWrapper>

    {/* 配送料 */}
    <LineWrapper>
      <p>配送料</p>
      <p>¥ {restaurantFee}</p>
    </LineWrapper>

    {/* 合計 */}
    <LineWrapper>
      <AmountText>商品数</AmountText>
      <AmountText>¥ {price + restaurantFee}</AmountText>
    </LineWrapper>
  </>
);
