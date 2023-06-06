import React from "react";
import { COLORS, FONT } from "../../style/Style";
import { styled } from "@mui/material";

const Header = () => {
	return (
		<HeaderContainer>
			<Icon src="/PwC_Outline_Logo.png" />
			<HeadingTitle>IDOS Document Generator</HeadingTitle>
		</HeaderContainer>
	);
};

const HeaderContainer = styled("div")({
	minHeight: "30px",
	padding: "15px 30px",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	position: "relative",
	backgroundColor: COLORS.primary,
	boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
});

const Icon = styled("img")({
	width: "64px",
	position: "absolute",
	left: "30px",
});

const HeadingTitle = styled("div")({
	fontSize: FONT.headerText,
	textTransform: "uppercase",
	fontWeight: 500,
	color: COLORS.white,
});

export default Header;
