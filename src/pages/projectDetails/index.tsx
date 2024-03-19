// import { FC } from "react";
// import Card from "../../components/card/card";
// import { Projects } from "../../models/projectInfoType";
// import TechStack from "../../shared/tech/techStack";

// interface ProjectPageProps {
//     projectData: Projects | null;
// }

// // const ArticlePage: FC<ProjectPageProps> = ({ projectData }) => {
// //     if (!projectData) {
// //         return null; // Return null if projectData is null or undefined
// //     }

// //     return (
// //         <Card color="bg-mainTheme" margin="mx-auto my-2 " maxWidth="min-h-dvh max-md:max-w-[90%] md:max-w-[40%] lg:max-w-[40%] max-sm:max-w-[90%]">
// //             <div className="rounded-lg flex flex-col justify-center sm:flex-row items-center px-10 py-5">
// //                 <img src={projectData?.icon} alt="profile-picture" className="w-36 h-36 object-cover rounded-full order-1" />
// //             </div>
// //             <div className="rounded-lg flex flex-col justify-center sm:flex-row items-center px-10 py-5">
// //                 <div className="my-5 text-slate-100">
// //                     <h4 className="block mb-2 font-sans text-3xl antialiased font-semibold leading-snug tracking-normal">
// //                         {projectData?.name}
// //                     </h4>
// //                     <div className="block font-sans text-base antialiased font-medium leading-relaxed bg-clip-text bg-gradient-to-tr from-blue-gray-600 to-blue-gray-400">
// //                         {projectData?.text && Array.isArray(projectData.text) ? (
// //                             projectData.text.map((textItem: string, index: number) => (
// //                                 <p key={index}>{textItem}</p>
// //                             ))
// //                         ) : (
// //                             <p>{projectData?.text}</p>
// //                         )}
// //                     </div>
// //                     <TechStack stack={projectData?.tech_stack} />
// //                 </div>
// //             </div>
// //         </Card>
// //     );
// // };

// // export default ArticlePage;


// export const ArticlePage = ({projectData}: any) => {
//     return (
//         <>
//         <div>test</div>
//         </>
//     )
// }


import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../../components/card/card'
import { Projects } from '../../models/projectInfoType';
import { fetchById } from '../../services/firebase';
import TechStack from '../../shared/tech/techStack';

export const ArticleDetail = () => {
  const [projectData, setProjectData] = useState<Projects | null>();
  // var projectData: Projects | null = await fetchById(params.id);

    const {id}= useParams()
    useEffect(() => {
      const fetch = async() => {
        const fetchedData = await fetchById(id!.toString());
        setProjectData(fetchedData);
      }

      fetch();
    }, [id])
 
    

    return (
        
      <Card color="bg-mainTheme" margin="mx-auto my-2 " maxWidth="min-h-dvh max-md:max-w-[90%] md:max-w-[40%] lg:max-w-[40%] max-sm:max-w-[90%]">
          <div className="rounded-lg flex flex-col justify-center sm:flex-row items-center px-10 py-5">
              <img src={projectData?.icon} alt="profile-picture" className="w-36 h-36 object-cover rounded-full order-1" />
          </div>
          <div className="rounded-lg flex flex-col justify-center sm:flex-row items-center px-10 py-5">
              <div className="my-5 text-slate-100">
                  <h4 className="block mb-2 font-sans text-3xl antialiased font-semibold leading-snug tracking-normal">
                      {projectData?.name}
                  </h4>
                  <div className="block font-sans text-base antialiased font-medium leading-relaxed bg-clip-text bg-gradient-to-tr from-blue-gray-600 to-blue-gray-400">
                      {projectData?.text && Array.isArray(projectData.text) ? (
                          projectData.text.map((textItem: string, index: number) => (
                              <Fragment key={index}>
                                  <br />
                                  <p key={index}>{textItem}</p>
                              </Fragment>
                          ))
                      ) : (
                          <p>{projectData?.text}</p>
                      )}
                  </div>
                  <TechStack stack={projectData?.tech_stack} />
              </div>
          </div>
      </Card>
  );
}

