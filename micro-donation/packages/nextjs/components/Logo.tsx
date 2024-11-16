"use client";

type Props = React.ComponentProps<"svg"> & {
  size?: number;
  color?: string;
};

/**
 * Lisk logo.
 */
export const Logo: React.FC<Props> = ({ size = 32, ...props }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <g clipPath="url(#clip0_1692_63849)">
        <path
          d="M18 0H6C2.68629 0 0 2.68629 0 6V18C0 21.3137 2.68629 24 6 24H18C21.3137 24 24 21.3137 24 18V6C24 2.68629 21.3137 0 18 0Z"
          fill="#4170F5"
        />
        <path
          d="M12.007 5L10.7339 7.0914L15.3296 14.8704L11.6013 18.9999C11.6013 18.9999 14.5317 18.9828 14.5143 18.9999C14.497 19.0171 18 15.1104 18 15.1104L12.007 5ZM10.3352 7.86269L6 15.1448L9.41609 18.9999H10.7009L12.5791 16.8407H10.4922L8.65217 14.8193L11.6 9.86734L10.3352 7.86269Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_1692_63849">
          <rect width="24" height="24" rx="12" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
