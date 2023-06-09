import React, { useEffect, useState } from "react";
import { Button, styled } from "@mui/material";
import { COLORS, FONT } from "../../style/Style";
import * as xlsx from "xlsx";
import Header from "../Header/Header";
import EmptyIcon from "../../assets/box.png";
import DialogPopup from "./components/DialogPopup";
import EditablePdfElement from "./components/EditablePdfElement";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const PdfGeneration = () => {
	const [pdfData, setPdfData] = useState(null);
	const [selectedSection, setSelectedSection] = useState(null);
	const [selectedSectionKey, setSelectedSectionKey] = useState(0);
	const [loadingPdfData, setLoadingPdfData] = useState(false);
	const [openUploadPopup, setOpenUploadPopup] = useState(false);

	const HandleCloseUploadPopup = () => setOpenUploadPopup(false);

	const GetSpacing = (key) => {
		let values = key.split(".");
		let multiplier =
			values[values.length - 1] === 0 ? values.length - 3 : values.length - 2;
		return `${20 * multiplier}px`;
	};

	const ChangeSeclectedSection = (selectionData, key) => {
		setSelectedSection({ ...selectionData });
		setSelectedSectionKey(key);
	};

	const GetPdfData = async (tocFile) => {
		setLoadingPdfData(true);
		const reader = new FileReader();
		reader.onload = (e) => {
			const data = e.target.result;
			const workbook = xlsx.read(data, { type: "array" });
			const sheetName = workbook.SheetNames[0];
			const worksheet = workbook.Sheets[sheetName];
			const json = xlsx.utils.sheet_to_json(worksheet);
			let toc_Creation = [];
			json.forEach((element) => {
				if (Object.keys(element).includes("__EMPTY"))
					if (Object.values(element).length === 2) {
						let toc_element = {
							sectionId: String(Object.values(element)[0]),
							sectionHeading: Object.values(element)[1],
							sectionDescription: [],
							finalSectionDescription: "",
						};
						toc_Creation.push(toc_element);
					}
			});
			// setTimeout(() => {
			setPdfData(toc_Creation);
			setLoadingPdfData(false);
			HandleCloseUploadPopup();
			// }, 3000);
		};
		reader.readAsArrayBuffer(tocFile);
	};

	return (
		<PageWrapper>
			<Header />
			<ButtonSection>
				<CustomButton onClick={() => setOpenUploadPopup(true)}>
					Upload TOC
				</CustomButton>
				<CustomButton>Download as PDF</CustomButton>
			</ButtonSection>
			<DisplaySection>
				{pdfData ? (
					<>
						<TableOfContentSection>
							<TableOfContent>
								{pdfData?.map((item, key) => (
									<TableOfContentValue
										key={key}
										onClick={() => ChangeSeclectedSection(item, key)}
										style={{ marginLeft: GetSpacing(item.sectionId) }}>
										{item.sectionId} {item.sectionHeading}
									</TableOfContentValue>
								))}
							</TableOfContent>
						</TableOfContentSection>
						<PdfElementSection>
							{selectedSection && (
								<>
									<TabContainer>
										<TabElement className="selected">
											Draft 1<CloseTabButton />
										</TabElement>
										<TabElement>
											Draft 2<CloseTabButton />
										</TabElement>
										<TabElement>Final Draft</TabElement>
									</TabContainer>
									<EditablePdfElement
										sectionData={selectedSection}
										selectedSectionKey={selectedSectionKey}
									/>
								</>
							)}
						</PdfElementSection>
					</>
				) : (
					<NoPdf>
						<NoPdfImage
							src={EmptyIcon}
							alt="Empty Icon"
							about="No File has been uploaded"
							title="No File has been uploaded"
						/>
					</NoPdf>
				)}
			</DisplaySection>
			<DialogPopup
				HandleClose={HandleCloseUploadPopup}
				open={openUploadPopup}
				UploadFile={GetPdfData}
				loading={loadingPdfData}
			/>
		</PageWrapper>
	);
};

const PageWrapper = styled("div")({
	display: "flex",
	flexDirection: "column",
	height: "100vh",
	overflow: "hidden",
});

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
	flexGrow: 1,
	display: "flex",
	overflow: "hidden",
});

const TableOfContentSection = styled("div")({
	width: "25%",
	paddingTop: "50px",
	paddingLeft: "40px",
	paddingBottom: "20px",
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
	position: "relative",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	backgroundColor: COLORS.secondary,
	boxShadow: "inset 3px 3px 7px 4px #ccc",
});

const TabContainer = styled("div")({
	position: "absolute",
	top: 0,
	left: 0,
	right: 0,
	display: "flex",
});

const TabElement = styled("div")({
	width: "150px",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	textAlign: "center",
	padding: "10px 5px",
	borderBottomLeftRadius: "20px",
	borderBottomRightRadius: "20px",
	backgroundColor: COLORS.primary,
	color: COLORS.white,
	position: "relative",
	marginRight: "2px",
	cursor: "pointer",
	"&:hover": {
		backgroundColor: COLORS.white,
		color: COLORS.primary,
	},
	"&.selected": {
		backgroundColor: `${COLORS.secondary} !important`,
		color: COLORS.black,
	},
});

const CloseTabButton = styled(HighlightOffIcon)({
	cursor: "pointer",
	position: "absolute",
	right: 10,
	color: "inherit",
	fontSize: "18px",
});

const NoPdf = styled("div")({
	width: "100%",
	height: "100%",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
});

const NoPdfImage = styled("img")({});

export default PdfGeneration;
