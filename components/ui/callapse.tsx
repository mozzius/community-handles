"use client"

import { FC, useState } from "react"

interface PropItem {
  title: string
  content: string | any
}

interface Props {
  items: PropItem[]
  accordion?: boolean
}
interface CollapseItemProp {
  title: string
  children?: any
  isOpen?: boolean
  onToggle?: () => void
}

const CollapseItem: FC<CollapseItemProp> = ({
  title,
  children,
  isOpen,
  onToggle,
}) => {
  return (
    <div
      className={`overflow-hidden rounded-md border border-zinc-200 px-5 dark:border-neutral-800 ${isOpen ? "active" : ""}`}
    >
      <div
        onClick={onToggle}
        className={`ff-collapse-title flex cursor-pointer items-center justify-between py-4 transition-all hover:text-red-700 dark:hover:text-yellow-300 ${isOpen ? "active text-red-700 dark:text-yellow-300" : ""}`}
      >
        <span>{title}</span>
        <svg
          width={20}
          height={20}
          data-v-df0f3063=""
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 1024"
          className={`${isOpen ? "-scale-y-100" : ""}`}
        >
          <path
            fill="currentColor"
            d="M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"
          ></path>
        </svg>
      </div>
      <div className="ff-collapse-description transition-all">{children}</div>
    </div>
  )
}

export const Collapse: FC<Props> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number>()

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? undefined : index)
  }

  return (
    <div className="flex flex-col gap-2.5">
      {items.map((item, idx) => (
        <CollapseItem
          key={idx}
          title={item.title}
          isOpen={openIndex === idx}
          onToggle={() => toggleItem(idx)}
        >
          {item.content}
        </CollapseItem>
      ))}
    </div>
  )
}
