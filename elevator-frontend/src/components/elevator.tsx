import { useEffect } from 'react';
import { ElevatorDirection, DoorState } from '../enums';

type ElevatorProps = {
  floor: number;
  active?: boolean;
  open?: boolean;
  onCallElevator: (floor: number, direction: ElevatorDirection) => void;
  onOpenDoor?: () => void;
  onCloseDoor?: () => void;
  onToggleDoor?: (state: DoorState) => void;
  queue: number[];
};

export default function Elevator({
  floor,
  active,
  open,
  onCallElevator,
  onToggleDoor,
  queue,
}: ElevatorProps) {
  const activeButton = queue.includes(floor);

  useEffect(() => {
    let timer = undefined;
    if (active && open) {
      timer = setTimeout(() => {
        onToggleDoor?.(DoorState.CLOSE);
      }, 2000);
    }
    if (active && !open) {
      clearTimeout(timer);
    }
  }, [active, open]);

  return (
    <div className="flex items-center space-x-2">
      <div className="flex">
        <button
          className="cursor-pointer"
          onClick={() => onCallElevator(floor, ElevatorDirection.UP)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`size-6 ${activeButton && 'text-red-400'}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
        <button
          className="cursor-pointer"
          onClick={() => onCallElevator(floor, ElevatorDirection.DOWN)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`size-6 ${activeButton && 'text-red-400'}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </div>
      <div
        className={`w-14 h-14 border-2 border-black flex justify-center items-center ${
          active && 'bg-gray-400'
        } ${open && 'bg-red-400'}`}
      >
        {floor}
      </div>
      <div className="flex flex-col">
        <button
          className="cursor-pointer flex space-y-2"
          onClick={() => onToggleDoor?.(DoorState.OPEN)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
        <button
          className="cursor-pointer flex space-y-2"
          onClick={() => onToggleDoor?.(DoorState.CLOSE)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
