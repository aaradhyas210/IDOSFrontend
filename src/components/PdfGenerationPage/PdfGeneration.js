import React, { useEffect, useState } from "react";
import { Button, styled } from "@mui/material";
import { COLORS, FONT } from "../../style/Style";
import EditablePdfElement from "./components/EditablePdfElement";
import data from "../../data.json";
import DialogPopup from "./components/DialogPopup";

const PdfGeneration = () => {
	const [selectedSection, setSelectedSection] = useState();
	const [openUploadPopup, setOpenUploadPopup] = useState(false);

	const HandleCloseUploadPopup = () => setOpenUploadPopup(false);

	const GetSpacing = (key) => {
		let values = key.split(".");
		let multiplier =
			values[values.length - 1] === 0 ? values.length - 3 : values.length - 2;
		return `${20 * multiplier}px`;
	};

	const ChangeSeclectedSection = (pdfData) => {
		setSelectedSection({ ...pdfData });
	};

	useEffect(() => {
		setSelectedSection(data?.pdfData?.[0]);
	}, []);

	return (
		<PageWrapper>
			<ButtonSection>
				<CustomButton onClick={() => setOpenUploadPopup(true)}>
					Upload TOC
				</CustomButton>
				<CustomButton>Generate PDF</CustomButton>
			</ButtonSection>
			<DisplaySection>
				<TableOfContentSection>
					<TableOfContent>
						{data.pdfData.map((item, key) => (
							<TableOfContentValue
								key={key}
								onClick={() => ChangeSeclectedSection(item)}
								style={{ marginLeft: GetSpacing(item.sectionId) }}>
								{item.sectionId} {item.sectionHeading}
							</TableOfContentValue>
						))}
					</TableOfContent>
				</TableOfContentSection>
				<PdfElementSection>
					<EditablePdfElement sectionData={selectedSection} />
				</PdfElementSection>
			</DisplaySection>
			<DialogPopup
				HandleClose={HandleCloseUploadPopup}
				open={openUploadPopup}
			/>
		</PageWrapper>
	);
};

const PageWrapper = styled("div")({});

const ButtonSection = styled("section")({
	display: "flex",
	justifyContent: "flex-start",
	alignItems: "center",
	backgroundColor: COLORS.primary,
	padding: "15px 30px",
	minHeight: "30px",
	marginTop: "20px",
	gap: "20px",
	boxShadow: "0px 3px 7px -3px rgba(0,0,0,0.75)",
});

const CustomButton = styled(Button)({
	padding: "5px 15px",
	textAlign: "center",
	fontSize: FONT.buttonFont,
	borderRadius: "5px",
	backgroundColor: COLORS.white,
	color: COLORS.black,
	boxShadow: "0px 2px 7px -3px rgba(0,0,0,0.75)",
	"&:hover": {
		backgroundColor: COLORS.white,
		opacity: 0.8,
	},
});

const DisplaySection = styled("section")({
	width: "100%",
	maxHeight: "82dvh",
	display: "flex",
});

const TableOfContentSection = styled("div")({
	width: "20%",
	padding: "50px",
	overflowY: "auto",
});

const TableOfContent = styled("div")({});

const TableOfContentValue = styled("div")({
	fontSize: FONT.subHeading,
	color: COLORS.aTag,
	textDecoration: "underline",
	textDecorationStyle: "dotted",
	cursor: "pointer",
	marginBottom: "5px",
});

const PdfElementSection = styled("div")({
	width: "80%",
	backgroundColor: COLORS.secondary,
	padding: "40px 30px",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	overflowY: "auto",
	boxShadow: "inset 3px 3px 7px 4px #ccc",
});

export default PdfGeneration;
