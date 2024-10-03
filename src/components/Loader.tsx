function Loader() {
  return(
    <section className="loader">
      <div></div>
    </section>
  )
}

export default Loader;

interface SkeletonProps {
  width?: string, 
  length?:number
 }

export const Skeleton = ({ width = "unset", length = 3 }:SkeletonProps) => {
  const skeletions = Array.from({ length }, (_, idx) => <div className="skeleton-shape" key={idx}></div> )
  return (
    <div className="skeleton-loader" style={{ width }}>
      {skeletions}
    </div>
  )
} 