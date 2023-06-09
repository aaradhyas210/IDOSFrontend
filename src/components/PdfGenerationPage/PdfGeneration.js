import React, { useEffect, useState } from "react";
import { Button, styled } from "@mui/material";
import { COLORS, FONT } from "../../style/Style";
import Header from "../Header/Header";
import EditablePdfElement from "./components/EditablePdfElement";
import data from "../../data.json";
import DialogPopup from "./components/DialogPopup";

const PdfGeneration = () => {
	const [pdfData, setPdfData] = useState(null);
	const [approvedPdfData, setApprovedPdfData] = useState(null);
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

	useEffect(() => {
		//remove when we get data
		setPdfData(data.pdfData);
		setSelectedSection(data?.pdfData?.[0]);
		MakeDeepCopyApprovedPdfData(data);
	}, []);

	const GetPdfData = async (tocFile) => {
		setLoadingPdfData(true);
		let formData = new FormData();
		formData.append("file", tocFile);
		fetch("https://idos-backend.azurewebsites.net/upload", {
			method: "POST",
			body: formData,
		})
			.then((res) => res.json())
			.then((resData) => {
				console.log(resData);
				setLoadingPdfData(false);
				HandleCloseUploadPopup();
				// setPdfData(data);
				// setSelectedSection(data?.pdfData?.[0])
				// MakeDeepCopyApprovedPdfData(data);
			})
			.catch((err) => {
				console.log(err);
				setLoadingPdfData(false);
			});
	};

	const MakeDeepCopyApprovedPdfData = (pdfData_tobecopied) => {
		let deep_copy = JSON.parse(JSON.stringify(pdfData_tobecopied));
		deep_copy?.pdfData?.forEach((element) => (element.approved = false));
		setApprovedPdfData({ ...deep_copy });
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
							<EditablePdfElement sectionData={selectedSection} />
						</PdfElementSection>
					</>
				) : (
					<NoPdf></NoPdf>
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
	backgroundColor: COLORS.secondary,
	padding: "40px 30px",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	overflowY: "auto",
	boxShadow: "inset 3px 3px 7px 4px #ccc",
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
