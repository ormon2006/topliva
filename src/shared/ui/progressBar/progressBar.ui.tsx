interface ProgressBarProps {
  progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-[264px] bg-[#e0e0e0] h-[12px] rounded-[12px] mb-[9px]">
      <div
        className="bg-tandaBtnBg h-full rounded-[10px]"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
};
