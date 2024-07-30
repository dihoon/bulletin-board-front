import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import ReactTextareaAutosize, {
  TextareaAutosizeProps,
} from 'react-textarea-autosize';

interface Props extends TextareaAutosizeProps {
  registerReturn: UseFormRegisterReturn;
}

export default function TextArea(props: Props) {
  const { registerReturn, defaultValue, ...rest } = props;
  const [text, setText] = useState<string>(defaultValue as string);
  const [lineHeight, setLineHeight] = useState<number>();

  const handleBeforeInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    const computedStyle = window.getComputedStyle(textarea);
    const newLineHeight = parseInt(computedStyle.lineHeight, 10);
    const scrollHeight = textarea.scrollHeight;

    if (lineHeight !== newLineHeight) {
      setLineHeight(newLineHeight);
    }

    if (
      props.maxRows &&
      lineHeight &&
      scrollHeight > lineHeight * props.maxRows
    ) {
      e.preventDefault();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    const scrollHeight = textarea.scrollHeight;

    if (
      lineHeight &&
      props.maxRows &&
      scrollHeight > lineHeight * props.maxRows
    ) {
      e.preventDefault();
      return;
    }
    setText(e.target.value);
    if (props.onChange) props.onChange(e);
  };

  return (
    <ReactTextareaAutosize
      {...registerReturn}
      {...rest}
      cacheMeasurements
      onInput={handleInput}
      onBeforeInput={handleBeforeInput}
      value={text}
    />
  );
}
