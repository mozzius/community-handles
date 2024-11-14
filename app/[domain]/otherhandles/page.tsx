import Image from "next/image"
import Image1 from "@/assets/images/handles/mainbastards.png"

const OTHER_HANDLES = [
  {
    title: "mainbastards.online",
    link: "https://mainbastards.online",
    src: Image1,
  },
]

export const metadata = {
  title: "FAQ",
  description: "Frequently Asked Questions",
}

export default function OtherHandlesPage() {
  return (
    <main className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="mb-10 flex max-w-[980px] flex-col items-start gap-4">
        <h1 className="text-2xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Other NAFO Related Handles
        </h1>
        <p className="text-lg text-muted-foreground sm:text-xl">
          Here you can find other handles used by the NAFO fellas.
        </p>
      </div>
      <div className="max-w-5xl">
        {OTHER_HANDLES.map((el, idx) => (
          <div key={idx}>
            <a href={el.link} className="text-xl hover:underline">
              {el.title}
            </a>
            <div>
              <a href={el.link}>
                <Image src={el.src} width={600} height={1000} alt="image" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
