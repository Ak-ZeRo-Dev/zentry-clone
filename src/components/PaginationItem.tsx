const PaginationItem = ({
  text,
  desc,
  num,
}: {
  text: string;
  desc: string;
  num: string;
}) => {
  return (
    <div className="pagination mt-4 flex items-start text-black">
      <div className="mr-5 flex flex-col items-center">
        <span className="font-general mt-[0.6px] text-xs lg:text-[10px]">
          {num}
        </span>
        <span className="lineContainer relative mt-4 h-24 w-1 overflow-hidden rounded-xl bg-gray-300/80">
          <span className="line absolute top-0 mt-4 h-24 w-1 -translate-y-full rounded-xl bg-gray-800/80"></span>
        </span>
      </div>
      <div className="pagination2 font-robert-regular relative flex flex-col gap-2">
        <h4 className="title">{text}</h4>
        <div className="h-auto">
          <p className="font-circular-web absolute top-7 max-w-64 text-xs lg:text-sm">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaginationItem;
