import { IconButton, OutlinedInput, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import EditNoteIcon from "@mui/icons-material/EditNote";
import SendIcon from "@mui/icons-material/Send";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { COLORS, FONT } from "../../../style/Style";

const EditablePdfElement = ({ sectionData, pdfData }) => {
	const [description, setDescription] = useState(
		sectionData?.sectionDescription?.[0]
	);
	const [editable, setEditable] = useState(false);

	useEffect(() => {
		setDescription(sectionData?.sectionDescription?.[0]);
	}, [sectionData]);

	return (
		<ElementWrapper>
			<ControlSection>
				<IconButtons onClick={() => setEditable(false)} disabled={!editable}>
					<DoneIcon style={{ color: "green" }} />
				</IconButtons>
				<IconButtons onClick={() => setEditable(true)} disabled={editable}>
					<EditNoteIcon />
				</IconButtons>
			</ControlSection>
			<EditingSection>
				<Title>
					{sectionData?.sectionId} {sectionData?.sectionHeading}
				</Title>
				<RichTextEditor
					theme="snow"
					value={description}
					onChange={setDescription}
					readOnly={!editable}
					modules={{ toolbar: true }}
					style={{
						backgroundColor: editable ? COLORS.white : "rgba(255,255,255,0.5)",
					}}
				/>
				{!editable && (
					<PromptField
						placeholder="Add prompt to change the contents of this field..."
						endAdornment={
							<IconButton>
								<SendIcon />
							</IconButton>
						}
					/>
				)}
			</EditingSection>
		</ElementWrapper>
	);
};

const ElementWrapper = styled("div")({
	width: "100%",
	display: "flex",
	alignItems: "center",
	gap: "30px",
});

const ControlSection = styled("div")({
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	rowGap: "20px",
});

const IconButtons = styled(IconButton)({
	backgroundColor: COLORS.white,
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
	minHeight: "300px",
	maxHeight: "500px",
	boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
	borderRadius: "5px",
	"& .ql-toolbar.ql-snow": {
		backgroundColor: "rgba(0,0,0,0.3)",
	},
	"& .ql-container.ql-snow": {
		minHeight: "300px",
		maxHeight: "400px",
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
	"& .MuiOutlinedInput-notchedOutline": {
		// border: "none",
	},
});

export default EditablePdfElement;
