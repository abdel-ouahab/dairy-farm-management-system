function Button({ icon, title, variant, onClick, classname=" " }) {
    const variants = {
      primary: {
        classname:
          " text-gray-100 bg-violet-500 w-28 hover:text-violet-950 hover:bg-gray-100",
        type: "submit",
      },
      secondary: {
        classname: "text-gray-50 ",
        type: "",
      }
    };
    const selectedVariant = variants[variant] ? variants[variant].classname : variants['secondary'].classname;
    const typeVariant = variants[variant] ? variants[variant].type : variants['secondary'].type;
    return (
      <button
        type={typeVariant}
        className={`flex items-center justify-center gap-4 ${selectedVariant} ${classname}`}
        onClick={onClick}
      >
        <p>{title && title}</p>
        {icon && icon}
      </button>
    );
  }
  
  export default Button;
  
  
