import { IconButton, OutlinedInput, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import EditNoteIcon from "@mui/icons-material/EditNote";
import SendIcon from "@mui/icons-material/Send";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { COLORS, FONT } from "../../../style/Style";

const EditablePdfElement = ({ sectionData, pdfData, GetGenerativeAnswer }) => {
	const [description, setDescription] = useState(
		sectionData?.sectionDescription?.[0]
	);
	const [editable, setEditable] = useState(false);

	useEffect(() => {
		// setDescription(sectionData?.sectionDescription?.[0]);
		setDescription(
			"<p> Introduction to USG Contracting is a complex process that requires a thorough understanding of the various regulations, policies, and procedures that govern the acquisition of goods and services by the US Government. The process begins with the identification of a need and the development of a plan to meet that need. This plan should include the type of contract to be used, the resources necessary to properly plan for, award, and administer the contract, the procedures to be used in awarding the contract, the anticipated award date, the scope of services required, the cost range and limitations, the type of contract, the estimated starting and completion dates, and any significant evaluation factors. Additionally, the plan should include any special requirements for contracts to be performed in a designated operational area or supporting a diplomatic or consular mission, as well as any other matters germane to the plan not covered elsewhere. \n\nOnce the plan is developed, the contracting officer must ensure that the solicitation is compliant with all applicable laws and regulations. This includes ensuring that the solicitation includes the appropriate clauses, such as the Buy American-Free Trade Agreements-Israeli Trade Act, or an equivalent agency clause, and that the solicitation is compliant with the OMB Uniform Guidance at 2 CFR part 200, subpart F. Additionally, the contracting officer must ensure that the contract is administered properly, including ensuring that inspection and acceptance corresponding to the work statement\u2019s performance criteria is enforced, and that higher-level quality standards are necessary if the contract is for supplies or service contracts that include supplies. \n\nFinally, the contracting officer must ensure that the contract is properly closed out. This includes ensuring that all deliverables have been received and accepted, that all payments have been made, and that all records have been retained for the required period of time. Additionally, the contracting officer must ensure that all applicable laws and regulations have been followed throughout the life of the contract. \n\nIn conclusion, USG Contracting is a complex process that requires a thorough understanding of the various regulations, policies, and procedures that govern the acquisition of goods and services by the US Government. It is important for contracting officers to ensure that the solicitation is compliant with all applicable laws and regulations, that the contract is administered properly, and that the contract is properly closed out.</p>"
		);
	}, [sectionData]);

	return (
		<ElementWrapper>
			{/* <ControlSection>
				<IconButtons onClick={() => setEditable(false)} disabled={!editable}>
					<DoneIcon style={{ color: "green" }} />
				</IconButtons>
				<IconButtons onClick={() => setEditable(true)} disabled={editable}>
					<EditNoteIcon />
				</IconButtons>
			</ControlSection> */}
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
							<IconButton onClick={GetGenerativeAnswer}>
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
	width: "85%",
	height: "100%",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
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
