import React, { FC, HTMLAttributes } from "react";
import classNames from "classnames";

export interface TextProps extends HTMLAttributes<HTMLDivElement> {
    remSize?: number;
}

const Text: FC<TextProps> = ({
                                 className,
                                 remSize = 0.875,
                                 children,
                                 ...props
                             }) => {

    return (
        <div
            className={classNames(
                "schmemory-text",
                className
            )}
            style={{
                        fontSize: remSize + "rem",
                    }
            }
            {...props}
        >
            {children}
        </div>
    );
};

export default Text;
