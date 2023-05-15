export default function HandlePage({ params }: { params: { handle: string } }) {
  return <div>{params.handle}</div>
}
