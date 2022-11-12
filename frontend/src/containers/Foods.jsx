export const Foods = ({match}) => {
  console.log(match, 'foods components')
  return (
    <>
      <h1>フード一覧</h1>
      <p>restrantId:{match.params.restaurantsId}</p>
    </>
  )
}