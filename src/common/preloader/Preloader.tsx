import preloader from "../../img/Ellipsis-4.2s-197px.svg";

interface Props{

}

const Preloader:React.FC <Props> = (props) => {
    return <div>
        <img src={preloader} alt=""/>
    </div>
}

export default Preloader;