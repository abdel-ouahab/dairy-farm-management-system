const Container = (props) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-700">
      <div className="sm:w-1/3 w-11/12 p-8 flex-col justify-center rounded-lg bg-violet-950 shadow-lg">
        {props.children}
      </div>
    </div>
  );
};

export default Container;
