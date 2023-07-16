import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";

interface FormHeaderProps {
  title: string;
  description: string;
  count?: number;
}

function FormHeader(props: FormHeaderProps) {
  const { title, description, count } = props;

  return (
    <>
      <Box component='div' className='header_container'>
        <Typography className='header_form_text'>{title}</Typography>
        {count !== undefined && count > 0 ? (
          <Box component='div'>
            <Typography className='herader_content_count'>{count}</Typography>
          </Box>
        ) : null}
      </Box>
      <Typography className='header_form_description'>{description}</Typography>
    </>
  );
}

export default FormHeader;
