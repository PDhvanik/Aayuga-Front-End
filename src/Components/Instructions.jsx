import React from 'react';

import { poseInstructions } from '../data';
import { poseImages } from '../utils/pose_images';

export default function Instructions({ currentPose }) {

    const instructions = poseInstructions;

    return (
        <div className="flex justify-center items-center mx-10 py-2 px-10 instruction-container">
            <div className='flex-col intruction-content'>
                <div className='bg-[#22c9ef] rounded-lg p-3'>{currentPose}
                </div>
                <ul className="mt-2 p-[10px] rounded-lg bg-white flex-col justify-center items-center">
                    {instructions[currentPose].map((instruction, index) => {
                        return (
                            <li className="instruction" key={index}>{instruction}</li>
                        )

                    })}
                </ul>
            </div>
            <img
                className="pose-demo-img m-4"
                src={poseImages[currentPose]}
                alt={`${currentPose}`}
            />
        </div>
    )
}
