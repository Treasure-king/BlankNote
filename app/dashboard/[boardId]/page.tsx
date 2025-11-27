import BoardClient from "./BoardClient";

export default async function Page({ params }) {
  const {boardId} = await params
  return <BoardClient boardId={boardId} />;
}
