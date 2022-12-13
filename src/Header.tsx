import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const HeaderWrapper = styled.header`
  position: absolute;
  display: flex;
  gap: 2rem;
  align-items: center;
  width: 80%;
  margin: 1rem 2rem -4rem 4rem;
  z-index: 500;
  right: 0;
  top: 0;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Headline = styled.h1`
  position: relative;
  text-align: left;
  background: transparent;
  flex-shrink: 0;
`;

const Form = styled.form`
  flex-grow: 1;
`;

const Fieldset = styled.fieldset`
  border: none;
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 0.5rem;
  width: 100%;
`;

const FileInput = styled.input`
  display: none;
`;

const FileInputReplacer = styled.button`
  color: black;
  background-color: white;
  border: 2px solid black;
  padding: 0.5rem;
  width: 100%;
`;

const Button = styled.button<{ color?: string }>`
  padding: 0.5rem;
  color: white;
  background-color: ${({ color }) => color || '#1677ff'};
`;

interface HeaderProps {
  onSubmit: (value: string) => void;
  onFileUpload: (file: any) => void;
};

export const Header = ({ onSubmit, onFileUpload }: HeaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [file, setFile] = useState<any>(null);

  const onInputReplacerClick = (e: any) => {
    e.preventDefault();
    inputRef.current && inputRef.current.click();
  };
  
  const handleUrlSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(value);
  };

  const onImageSelect = (e: any) => {
      setFile(e.target.files[0]);
      console.log(e.target.files[0]);
  };

  return (
    <HeaderWrapper>
      <Headline>KMZ-POC</Headline>
      <Form>
        <Fieldset>
          <Input placeholder="Enter KMZ file Url" onChange={e => setValue(e.target.value)} />
          <Button onClick={handleUrlSubmit} >Go</Button>
        </Fieldset>
        <Fieldset>
          <FileInput ref={inputRef} type="file" onChange={onImageSelect} />
          <FileInputReplacer onClick={onInputReplacerClick} color="white" >Choose file</FileInputReplacer>
          <Button onClick={() => onFileUpload(file)} color="crimson" >Go</Button>
        </Fieldset>
      </Form>
    </HeaderWrapper>
  );
};
