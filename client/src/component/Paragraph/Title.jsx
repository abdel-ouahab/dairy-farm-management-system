const Title = (props) => {
  return (
    <div className="flex items-center justify-center mb-5 text-4xl font-bold text-gray-100">
      {props.children}
    </div>
  );
};

export default Title;
