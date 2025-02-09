import React from "react";
import { useParams } from "react-router-dom";
import { quizAtom } from "../../atoms/IndiviualQuestion";
import { useAtom } from "jotai";

const Readmore = () => {
  const { id } = useParams();
  const [quiz] = useAtom(quizAtom);
  // eslint-disable-next-line no-constant-binary-expression
  const questionIndex = Number(id) ?? 0;
  
  const question = quiz?.questions?.[questionIndex];

  const contentSections = question?.reading_material?.content_sections || [];
  const practiceContent = question?.reading_material.practice_material?.content || [];
  const practiceKeywords = question?.reading_material.practice_material?.keywords || [];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Read More
      </h2>

      {/* Render Reading Material Sections */}
      {contentSections.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-black mb-3">
            Reading Material
          </h3>
          <div className="space-y-4">
            {contentSections.map((section, index) => (
              <div
                key={index}
                className="bg-gray-100 dark:bg-gray-800 p-5 rounded-lg shadow-md prose dark:prose-invert text-white"
              >
                <div dangerouslySetInnerHTML={{ __html: section }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Render Practice Material Sections */}
      {practiceContent.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-black  mb-3 ">
            Practice Material
          </h3>
          <div className="space-y-4">
            {practiceContent.map((content, index) => (
              <div
                key={index}
                className="bg-gray-100 dark:bg-gray-800 p-5 rounded-lg shadow-md prose dark:prose-invert text-white"
              >
                <div dangerouslySetInnerHTML={{ __html: content }} className="text-white"/>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Render Practice Keywords */}
      {practiceKeywords.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-black mb-3">
            Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {practiceKeywords.map((key, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full"
              >
                {key}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* If no reading or practice material is available */}
      {contentSections.length === 0 && practiceContent.length === 0 && (
        <p className="text-black text-center">
          No additional reading or practice material available.
        </p>
      )}
    </div>
  );
};

export default Readmore;
