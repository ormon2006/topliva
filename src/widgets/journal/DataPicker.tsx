type DatePickerOverlayProps = {
    onDateSelect: (date: Date) => void;
    isOpen: boolean;
    onClose: () => void;
  };
  
  export const DatePickerOverlay: React.FC<DatePickerOverlayProps> = ({
    onDateSelect,
    isOpen,
    onClose,
  }) => {
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedDate = new Date(event.target.value);
      onDateSelect(selectedDate);
      onClose();
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div
          className="absolute inset-0 bg-black opacity-30"
          onClick={onClose}
        ></div>
        <div className="relative bg-white p-4 rounded-lg shadow-lg z-10">
          <input
            type="date"
            onChange={handleDateChange}
            className="border border-gray-300 rounded-lg p-2"
          />
        </div>
      </div>
    );
  };
  