import React from 'react';

const AboutUs = () => {
    return (
        <div className='container '>
            <div className='hidden md:block p-9'>
                <div className='flex pb-28 gap-6 items-center '>
                    <div className='font-extrabold flex justify-start  h-full text-[77px] w-[70%] pl-[40px]'>
                        <h1>Where small <br />Businesses <br />get big ideas.</h1>
                    </div>
                    <div className='h-full'>
                    <img src='/assets/images/about.png' className='w-[538px]' alt='About Us' />
                    </div>
                </div>


                <div>
                    <p className='w-[100%] p-9 m-100px m-auto mt-[-100px] text-2xl'>Founded in Rajkot, India, in 2024, <span className='font-extrabold'>Saint Rosario</span> is one of the world’s leading luxury brands.<br /> Following the House’s centenary, <span className='font-extrabold'>Saint Rosario</span> forges ahead continuing to redefine luxury while celebrating creativity, Italian craftsmanship, and innovation.<br /><br /> <span className='font-bold'>Saint Rosario</span> is part of the global luxury group Kerning, which manages renowned Houses in fashion, leather goods, jewellery.<br /><br /> Discover the stories behind the House's collections, exclusively on Stories.</p>
                </div>


                <div className="h-full flex gap-14">
                    <div>
                        <div>
                            <img src='/assets/images/about2.png' className='w-[449px] h-[672px]' alt='About 2'></img>
                        </div>

                        <div className='p-4 '>
                            <h1 className="font-[700]  mb-2">A “just-right” selection</h1>
                            <p >We give small business owners the right assortment of products and options. We don’t overwhelm, but we don’t come up short. And it’s all at the right price.</p>
                        </div>
                    </div>
                    <div>
                        <div >
                            <img src='/assets/images/about2.png' className="w-[449px] h-[672px]" alt='About 2'></img>
                        </div>
                        <div className='p-4 '>
                            <h1 className="font-[700]  mb-2">A “just-right” selection</h1>
                            <p>We give small business owners the right assortment of products and options. We don’t overwhelm, but we don’t come up short. And it’s all at the right price.</p>

                        </div>
                    </div>
                    <div>
                        <div>
                            <img src='/assets/images/about2.png' className='w-[449px] h-[672px]' alt='About 2'></img>
                        </div>
                        <div className='p-4 '>
                            <h1 className="font-[700]  mb-2">A “just-right” selection</h1>
                            <p>We give small business owners the right assortment of products and options. We don’t overwhelm, but we don’t come up short. And it’s all at the right price.</p>

                        </div>
                    </div>
                </div>
            </div>
            <div className='md:hidden p-4 relative'>
                <div className=''>
                    <div className=''>
                        <img src='/assets/images/about.png' className='w-full' alt='About Us' />
                    </div>
                    <div className='font-extrabold flex justify-start items-center mt-6 h-full text-4xl text-center '>
                        <h1 className='m-auto text-[32px]'>Where small Businesses<br/> get big ideas.</h1>
                    </div>
                    <div>
                        <p className='w-[100%] text-sm my-7 '>Founded in Rajkot, India, in 2024, <span className='font-extrabold'>Saint Rosario</span> is one of the world’s leading luxury brands. Following the House’s centenary, <span className='font-extrabold'>Saint Rosario</span> forges ahead continuing to redefine luxury while celebrating creativity, Italian craftsmanship, and innovation.<br /><br /> <span className='font-extrabold'>Saint Rosario</span> is part of the global luxury group Kerning, which manages renowned Houses in fashion, leather goods, jewellery. Discover the stories behind the House's collections, exclusively on Stories.</p>
                    </div>
                    <div className="h-full">
                        <div>
                            <div className='w-full'>
                                <img src='/assets/images/about2.png' className='w-full' alt='About 2' />
                            </div>

                            <div className='my-7'>
                                <h1 className=" font-semibold  ">A “just-right” selection</h1>
                                <p className='font-thin'>We give small business owners the right assortment of products and options. We don’t overwhelm, but we don’t come up short. And it’s all at the right price.</p>
                            </div>
                        </div>
                        <div>
                            <div className='w-full'>
                                <img src='/assets/images/about2.png' className="w-full" alt='About 2' />
                            </div>
                            <div className='my-7'>
                                <h1 className=" font-semibold  ">A “just-right” selection</h1>
                                <p className='font-thin'>We give small business owners the right assortment of products and options. We don’t overwhelm, but we don’t come up short. And it’s all at the right price.</p>
                            </div>
                        </div>
                        <div>
                            <div className='w-full'>
                                <img src='/assets/images/about3.png' className='w-full' alt='About 2' />
                            </div>
                            <div className='my-7'>
                                <h1 className=" font-semibold  ">A “just-right” selection</h1>
                                <p className='font-thin'>We give small business owners the right assortment of products and options. We don’t overwhelm, but we don’t come up short. And it’s all at the right price.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default AboutUs;
