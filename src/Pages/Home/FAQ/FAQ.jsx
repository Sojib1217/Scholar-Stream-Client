import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react"

const FAQ = () => {
    return (
        <div className='mt-20 px-4 md:px-26 space-y-3'>
            <motion.div className='text-center mb-10'
                initial={{ y: -200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <h1 className='text-4xl font-bold my-4 text-purple-500'>Frequently Asked Question</h1>
                <p className=''>“Find quick answers to the most common questions about applying for scholarships through ScholarStream.”</p>

            </motion.div>

            <motion.div className="collapse collapse-arrow bg-base-100 border border-base-300 hover:bg-purple-500 hover:text-white"
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >

                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title font-semibold">How do I apply for a scholarship on ScholarStream?</div>
                <div className="collapse-content text-sm">You can browse available scholarships, select one that matches your profile, and click “Apply Now.” Then fill out the form and submit the required documents..</div>
            </motion.div>

            <motion.div className="collapse collapse-arrow bg-base-100 border border-base-300 hover:bg-purple-500 hover:text-white"
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >

                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">Do I need an account to apply?</div>
                <div className="collapse-content text-sm">Yes. You must create an account to apply, track application status, and save your favorite scholarships.</div>
            </motion.div>

            <motion.div className="collapse collapse-arrow bg-base-100 border border-base-300 hover:bg-purple-500 hover:text-white"
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >

                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">Is using ScholarStream free?</div>
                <div className="collapse-content text-sm">Browsing scholarships is 100% free.
                    Some applications may require an application fee depending on the university.</div>
            </motion.div>

            <motion.div className="collapse collapse-arrow bg-base-100 border border-base-300 hover:bg-purple-500 hover:text-white"
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >

                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">Can I apply for multiple scholarships at the same time?</div>
                <div className="collapse-content text-sm">Yes! You can apply to as many scholarships as you like.</div>
            </motion.div>


            
        </div>
    );
};

export default FAQ;