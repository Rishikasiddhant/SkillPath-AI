function Card(Props) {
    return(
        <div>
            <h1>{Props.name}</h1>
            <img height={200} width={200} src={Props.img} alt="" />
        <p>{Props.age}</p>
        </div>

    )
}
export default Card;

