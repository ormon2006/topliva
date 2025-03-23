interface ProgressBarProps {
  progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-[264px] max-[685px]:w-[210px] bg-[#e0e0e0] h-[12px] rounded-[12px] mb-[9px] overflow-hidden">
      <div
        className="bg-tandaBtnBg h-full rounded-[10px] transition-all duration-500 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>  
  );
};
