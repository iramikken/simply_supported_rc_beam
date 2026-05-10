import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
          <section className="flex flex-col justify-center items-center w-full" >
            <div className="flex flex-col-reverse items-center">
              <h1 className="">Get started</h1>
              <p>
                Calculations for structural engineering
              </p>
            </div>
            <Link
            to="/simply-supported-beam"
              type="button"
              className="bg-blue-300 hover:bg-blue-400 flex justify-center w-fit rounded-md p-2 m-2"
            >
                Simply supported beam analysis
            </Link>
          </section>
    
          
        </>
  )
}
