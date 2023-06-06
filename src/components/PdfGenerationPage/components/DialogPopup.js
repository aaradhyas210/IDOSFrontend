import { Button, Dialog, IconButton, styled } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { COLORS, FONT } from "../../../style/Style";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DescriptionIcon from "@mui/icons-material/Description";

const DialogPopup = ({ HandleClose, open }) => {
	const [file, setFile] = useState(null);
	const drop = useRef(null);

	const BrowseFile = () => {
		document.getElementById("fileSelector").click();
	};

	const SelectFile = (e) => {
		setFile(e.target.files[0]);
	};

	useEffect(() => {
		drop?.current?.addEventListener("dragover", HandleDragOver);
		drop?.current?.addEventListener("drop", HandleDrop);
		return () => {
			//eslint-disable-next-line
			drop?.current?.removeEventListener("dragover", HandleDragOver);
			//eslint-disable-next-line
			drop?.current?.removeEventListener("drop", HandleDrop);
		};
		//eslint-disable-next-line
	}, []);

	const HandleDragOver = (e) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const HandleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setFile(e.dataTransfer.files[0]);
	};

	return (
		<Dialog fullWidth={true} maxWidth="md" open={open} onClose={HandleClose}>
			<UploadWrapper>
				<CloseIconButton onClick={HandleClose}>
					<CloseIcon />
				</CloseIconButton>
				<UploadContainer ref={drop}>
					<CloudUploadIcon style={{ fontSize: 60, color: COLORS.secondary }} />
					<UploadText className="large">Drag file to upload</UploadText>
					<UploadText className="small">Or</UploadText>
					<BrowseFileButton onClick={BrowseFile}>Browse Files</BrowseFileButton>
					<HiddenInput
						id="fileSelector"
						accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
						type="file"
						onChange={SelectFile}
					/>
					{file && (
						<>
							<PreviewContainer>
								<RowFlexContainer>
									<DescriptionIcon
										style={{ fontSize: 40, marginRight: "5px", color: "green" }}
									/>
									<UploadText className="small">
										{file?.name} <br />
										{Math.round(file?.size / 100) / 10} KB
									</UploadText>
								</RowFlexContainer>
							</PreviewContainer>
							<UploadButton>Upload File</UploadButton>
						</>
					)}
				</UploadContainer>
			</UploadWrapper>
		</Dialog>
	);
};

const UploadWrapper = styled("div")({
	height: "40vh",
	backgroundColor: COLORS.white,
	padding: "30px",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	position: "relative",
});

const UploadContainer = styled("div")({
	border: `2px solid ${COLORS.black}`,
	width: "100%",
	height: "100%",
	borderRadius: "20px",
	borderStyle: "dashed",
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
});

const CloseIconButton = styled(IconButton)({
	position: "absolute",
	right: 0,
	top: 0,
});

const UploadText = styled("div")({
	fontWeight: 350,
	fontFamily: "Helvetica Neue",
	color: COLORS.black,
	textAlign: "left",
	"&.large": {
		fontSize: FONT.titleText,
	},
	"&.small": {
		fontSize: FONT.buttonFont,
	},
});

const BrowseFileButton = styled(Button)({
	background: COLORS.secondary,
	color: COLORS.black,
	fontWeight: 400,
	fontSize: FONT.buttonFont,
	padding: "5px 20px",
	marginTop: "10px",
	borderRadius: "30px",
	"&:hover": {
		background: COLORS.secondary,
		opacity: 0.8,
	},
});

const HiddenInput = styled("input")({
	display: "none",
});

const PreviewContainer = styled("div")({
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "flex-start",
	marginTop: "20px",
});

const RowFlexContainer = styled("div")({
	display: "flex",
	justifyContent: "flex-start",
	alignItems: "center",
});

const UploadButton = styled(Button)({
	backgroundColor: COLORS.primary,
	color: COLORS.white,
	padding: "5px 20px",
	marginTop: "20px",
	borderRadius: "20px",
	fontSize: FONT.buttonFont,
	"&:hover": {
		opacity: 0.5,
		backgroundColor: COLORS.primary,
	},
});

export default DialogPopup;
