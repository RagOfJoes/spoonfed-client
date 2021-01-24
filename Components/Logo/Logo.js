const Logo = (props) => {
  const {
    width = 256,
    height = 256,
    color = { icon: "#fdfcfc", background: "#5fabb8" },
  } = props;

  const defaultColor = {
    icon: "#fdfcfc",
    background: "#5fabb8",
  };
  const _color = Object.assign({}, color, defaultColor);
  return (
    <svg
      fill="none"
      width={width}
      height={height}
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Logo">
        <g id="Logo_2">
          <rect
            id="Bg"
            rx="20"
            width="256"
            height="256"
            fill={_color.background}
          />
          <g id="Vector">
            <path
              fill={_color.icon}
              d="M153.5 49.5H176.115V209C176.115 213.418 172.534 217 168.115 217H161.5C157.082 217 153.5 213.418 153.5 209V49.5Z"
            />
            <path
              fill={_color.icon}
              d="M153.5 39.9158C153.5 39.6862 153.686 39.5 153.916 39.5C176.882 39.5 195.5 58.1179 195.5 81.0842V177H153.5V39.9158Z"
            />
          </g>
          <g id="Vector_2">
            <path
              fill={_color.icon}
              d="M61 39.5C71.4934 39.5 80 48.0066 80 58.5V201C69.5066 201 61 192.493 61 182V39.5Z"
            />
            <path
              fill={_color.icon}
              d="M91 58.25C91 53.4175 94.9175 49.5 99.75 49.5C104.582 49.5 108.5 53.4175 108.5 58.25V144.52H91V58.25Z"
            />
            <path
              fill={_color.icon}
              d="M119.5 58.5C119.5 48.0066 128.007 39.5 138.5 39.5V182C138.5 192.493 129.993 201 119.5 201V58.5Z"
            />
            <path
              fill={_color.icon}
              d="M61 149.955H138.5V178.25C138.5 199.651 121.151 217 99.75 217C78.349 217 61 199.651 61 178.25V149.955Z"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default Logo;
