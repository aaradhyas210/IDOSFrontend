import { Button, IconButton, OutlinedInput, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { COLORS, FONT } from "../../../style/Style";

const EditablePdfElement = ({
	selectedSectionKey,
	pdfData,
	GetGenerativeAnswer,
	tabSelected,
	setPdfData,
	setTabSelected,
}) => {
	const [description, setDescription] = useState();
	const [editable, setEditable] = useState(tabSelected === "Final");
	const [prompt, setPrompt] = useState("");

	useEffect(() => {
		setPrompt("");
		if (tabSelected !== "Final") {
			setEditable(false);
			setDescription(
				pdfData?.[`${selectedSectionKey}`]?.sectionDescription?.[
					`${tabSelected}`
				]
			);
		} else {
			setEditable(true);
			setDescription(
				pdfData?.[`${selectedSectionKey}`]?.finalSectionDescription
			);
		}
	}, [pdfData, tabSelected, selectedSectionKey]);

	const OnChangePrompt = (e) => {
		setPrompt(e.target.value);
	};

	const MoveToFinalDraft = () => {
		let pdf_data = [...pdfData];
		let initial_value =
			pdf_data?.[`${selectedSectionKey}`]?.finalSectionDescription;
		pdf_data[`${selectedSectionKey}`].finalSectionDescription =
			initial_value + description;
		setPdfData(pdf_data);
		setTabSelected("Final");
	};

	const FinalDraftSave = () => {
		let pdf_data = [...pdfData];
		pdf_data[`${selectedSectionKey}`].finalSectionDescription = description;
		setPdfData(pdf_data);
	};

	return (
		<ElementWrapper>
			<EditingSection>
				<Title>
					{pdfData?.[`${selectedSectionKey}`]?.sectionId}{" "}
					{pdfData?.[`${selectedSectionKey}`]?.sectionHeading}
				</Title>
				<RichTextEditor
					theme="snow"
					value={description}
					onChange={setDescription}
					onBlur={FinalDraftSave}
					readOnly={!editable}
					modules={{ toolbar: true }}
					style={{
						backgroundColor: editable ? COLORS.white : "rgba(255,255,255,0.5)",
					}}
				/>
				{!editable && (
					<PromptField
						placeholder="Add prompt to change the contents of this field..."
						value={prompt}
						onChange={OnChangePrompt}
						endAdornment={
							<IconButton
								onClick={() =>
									GetGenerativeAnswer(
										pdfData?.[`${selectedSectionKey}`]?.sectionId,
										prompt,
										selectedSectionKey,
										true
									)
								}>
								<SendIcon />
							</IconButton>
						}
					/>
				)}

				{tabSelected !== "Final" ? (
					<ButtonContainer>
						<ActionButton onClick={MoveToFinalDraft}>
							Move to Final Draft
						</ActionButton>
					</ButtonContainer>
				) : (
					<ButtonContainer>
						<ActionButton id="saveFinalDraft" onClick={FinalDraftSave}>
							Save
						</ActionButton>
					</ButtonContainer>
				)}
			</EditingSection>
		</ElementWrapper>
	);
};

const ElementWrapper = styled("div")({
	width: "85%",
	height: "100%",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	gap: "30px",
});

const EditingSection = styled("div")({
	flexGrow: 1,
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
});

const Title = styled("div")({
	fontSize: FONT.headerText,
	color: COLORS.black,
	width: "100%",
	fontWeight: 600,
	textTransform: "uppercase",
	marginBottom: "20px",
});

const RichTextEditor = styled(ReactQuill)({
	width: "100%",
	boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
	borderRadius: "5px",
	"& .ql-toolbar.ql-snow": {
		backgroundColor: "rgba(0,0,0,0.3)",
	},
	"& .ql-container.ql-snow": {
		height: "300px",
		border: "none",
		overflowY: "auto",
	},
	"& .ql-editor": {
		fontSize: FONT.subHeading,
	},
});

const PromptField = styled(OutlinedInput)({
	width: "100%",
	marginTop: "35px",
	borderRadius: "5px",
	border: "1px solid #D4D4D4",
	backgroundColor: COLORS.white,
	"& input::placeholder": {
		fontStyle: "italic",
	},
});

const ButtonContainer = styled("div")({
	width: "100%",
});

const ActionButton = styled(Button)({
	backgroundColor: COLORS.primary,
	color: COLORS.white,
	marginTop: "20px",
	fontSize: FONT.smallButton,
	"&:hover": {
		backgroundColor: COLORS.primary,
		opacity: 0.8,
	},
});

export default EditablePdfElement;
