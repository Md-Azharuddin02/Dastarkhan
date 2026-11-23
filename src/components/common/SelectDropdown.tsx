import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Check, ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  detail?: string;
}

interface SelectDropdownProps {
  id: string;
  labelId?: string;
  value: string;
  options: readonly SelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SelectDropdown({
  id,
  labelId,
  value,
  options,
  onChange,
  placeholder = 'Select an option',
  className = '',
}: SelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(() =>
    Math.max(
      0,
      options.findIndex((opt) => opt.value === value),
    ),
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxId = useId();
  const prefersReducedMotion = useReducedMotion();

  const selectedIndex = options.findIndex((opt) => opt.value === value);
  const selectedOption = selectedIndex >= 0 ? options[selectedIndex] : undefined;

  useEffect(() => {
    setIsOpen(false);
  }, [options]);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [isOpen]);

  const openMenu = (initialIndex?: number) => {
    const nextIdx =
      initialIndex !== undefined
        ? initialIndex
        : selectedIndex >= 0
          ? selectedIndex
          : 0;
    setHighlightedIndex(nextIdx);
    setIsOpen(true);
  };

  const selectOption = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (options.length === 0) return;

    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        if (!isOpen) {
          openMenu(selectedIndex >= 0 ? selectedIndex : 0);
        } else {
          setHighlightedIndex((prev) => (prev + 1) % options.length);
        }
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        if (!isOpen) {
          openMenu(selectedIndex >= 0 ? selectedIndex : options.length - 1);
        } else {
          setHighlightedIndex((prev) => (prev - 1 + options.length) % options.length);
        }
        break;
      }
      case 'Home': {
        if (!isOpen) return;
        event.preventDefault();
        setHighlightedIndex(0);
        break;
      }
      case 'End': {
        if (!isOpen) return;
        event.preventDefault();
        setHighlightedIndex(options.length - 1);
        break;
      }
      case 'Enter':
      case ' ': {
        event.preventDefault();
        if (!isOpen) {
          openMenu();
        } else if (options[highlightedIndex]) {
          selectOption(options[highlightedIndex].value);
        }
        break;
      }
      case 'Escape': {
        if (!isOpen) return;
        event.preventDefault();
        event.stopPropagation();
        setIsOpen(false);
        break;
      }
      case 'Tab': {
        if (isOpen) setIsOpen(false);
        break;
      }
      default:
        break;
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        ref={triggerRef}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-labelledby={labelId ? `${labelId} ${id}` : undefined}
        aria-activedescendant={
          isOpen && options[highlightedIndex]
            ? `${listboxId}-opt-${highlightedIndex}`
            : undefined
        }
        onClick={() => (isOpen ? setIsOpen(false) : openMenu())}
        onKeyDown={handleKeyDown}
        className={`flex h-10 w-full cursor-pointer items-center justify-between gap-2 rounded-xl border bg-surface px-3.5 text-left text-xs transition-all duration-150 focus:outline-none ${
          isOpen
            ? 'border-forest ring-2 ring-forest/15'
            : 'border-beige hover:border-fresh hover:bg-cream'
        }`}
      >
        <span
          className={`min-w-0 truncate ${
            selectedOption ? 'font-medium text-charcoal' : 'text-muted'
          }`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        <span className="flex shrink-0 items-center gap-2">
          {selectedOption?.detail && (
            <span className="text-[11px] font-medium text-muted tabular-nums">
              {selectedOption.detail}
            </span>
          )}
          <ChevronDown
            className={`h-4 w-4 shrink-0 transition-transform duration-150 ${
              isOpen ? 'rotate-180 text-forest' : 'text-fresh'
            }`}
            aria-hidden="true"
          />
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            id={listboxId}
            role="listbox"
            aria-labelledby={labelId}
            initial={prefersReducedMotion ? false : { opacity: 0, y: -4, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -4, scale: 0.99 }}
            transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 max-h-60 overflow-y-auto rounded-2xl border border-beige bg-surface p-1.5 shadow-md"
          >
            {options.map((option, index) => {
              const isSelected = option.value === value;
              const isHighlighted = index === highlightedIndex;

              return (
                <li
                  key={option.value}
                  id={`${listboxId}-opt-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    selectOption(option.value);
                  }}
                  className={`flex min-h-[38px] cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2 text-xs transition-colors ${
                    isSelected
                      ? 'bg-leaf-soft font-semibold text-forest'
                      : isHighlighted
                        ? 'bg-sand font-medium text-charcoal'
                        : 'font-medium text-charcoal'
                  }`}
                >
                  <span className="min-w-0 truncate">{option.label}</span>

                  <span className="flex shrink-0 items-center gap-2">
                    {option.detail && (
                      <span
                        className={`text-[11px] tabular-nums ${
                          isSelected
                            ? 'font-semibold text-forest'
                            : 'font-normal text-muted'
                        }`}
                      >
                        {option.detail}
                      </span>
                    )}
                    <span
                      className="flex h-4 w-4 items-center justify-center"
                      aria-hidden="true"
                    >
                      {isSelected && <Check className="h-3.5 w-3.5 text-forest" />}
                    </span>
                  </span>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
