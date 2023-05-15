import Rule1 from "@/assets/image_rule1.svg";
import Rule2 from "@/assets/image_rule2.svg";
import Rule3 from "@/assets/image_rule3.svg";
import styled from "styled-components";

const Container = styled.div`
	width: 558px;
	height: 384px;
	background-color: rgba(107, 182, 74, 0.15);
	border-radius: 8px;
	padding: 24px 32px;
`;

const Rule = styled.div`
	display: flex;
	align-items: center;
`;
const RuleExample = styled.div`
	width: 256px;
	margin-right: 32px;
	user-select: none;
`;

const RuleText = styled.p`
	font-size: 14px;
	line-height: 20px;
	font-weight: 600;
	color: #53514c;
`;

const DotLine = styled.div`
	width: 100%;
	margin: 20px 0;
	border: 1px dashed #008b47;
	opacity: 0.1;
`;

const AiRule = () => {
	return (
		<Container>
			<Rule>
				<RuleExample>
					<img src={Rule1} />
				</RuleExample>
				<RuleText>
					위에서 찍은 사진, 음식이 잘 보이는
					<br /> 사진이 좋아요.
				</RuleText>
			</Rule>
			<DotLine />
			<Rule>
				<RuleExample>
					<img src={Rule2} />
				</RuleExample>
				<RuleText>
					크기가 너무 작거나 화질이 낮을 경우
					<br /> 분석 결과가 부정확할 수 있어요.
				</RuleText>
			</Rule>
			<DotLine />
			<Rule>
				<RuleExample>
					<img src={Rule3} />
				</RuleExample>
				<RuleText>
					사진 속 음식의 개수는 4개 이하,
					<br />
					한식 사진이 분석 정확도가 높아요.
				</RuleText>
			</Rule>
		</Container>
	);
};

export default AiRule;
