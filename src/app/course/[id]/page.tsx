

const CoursePage = ({params}:{params:{id:string}}) => {


    const {id} = params

    return (
        <div>
            THIs is supposed to be the course page!!!!
            this is the course page with the id ----- {id}
        </div>
    )
}

export default CoursePage