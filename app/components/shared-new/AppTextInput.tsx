import { TextInput as GrommetTextInput } from "grommet";
import { forwardRef, Ref } from "react";
import styled from "styled-components";

import {
  borderSize,
  colors,
  edgeSize,
  fontFamily,
  fontWeight,
  text,
  transition,
} from "../../theme/theme-new";
import { Size } from "./Text/config";

type Props = {
  hasError?: boolean;
  id?: string;
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  pad?: string;
  placeholder?: string;
  size?: Size;
  value: string;
  width?: string;
};

const StyledGrommetTextInput = styled(GrommetTextInput)`
  border-color: ${colors.fill20};
  border-radius: ${borderSize.small};
  border-width: ${borderSize.xsmall};
  color: ${colors.textDark};
  font-weight: ${fontWeight.normal};
  height: ${edgeSize.large};
  line-height: ${edgeSize.large};
  padding: 0 ${edgeSize.xsmall};
  transition: ${transition};

  &:focus {
    border-color: ${colors.primary};
  }

  &::placeholder {
    color: ${colors.gray5};
  }
`;

function TextInput(
  { hasError, id, name, onChange, pad, placeholder, size, value, width }: Props,
  ref?: Ref<HTMLInputElement>
): JSX.Element {
  const finalSize = size || "component";

  const style = {
    borderColor: hasError ? colors.danger5 : undefined,
    fontFamily: fontFamily[finalSize],
    fontSize: text[finalSize].size,
    padding: `0 ${pad || edgeSize.xsmall}`,
    width,
  };

  return (
    <StyledGrommetTextInput
      id={id}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      style={style}
      value={value}
    />
  );
}

export default forwardRef(TextInput);