const Loading = () => {
  return (
    <div className="flex-center absolute inset-0 z-50 h-dvh bg-violet-50">
      <div className="three-body">
        <div className="three-body__dot" />
        <div className="three-body__dot" />
        <div className="three-body__dot" />
      </div>
    </div>
  );
};
export default Loading;
