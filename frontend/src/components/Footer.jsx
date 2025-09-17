import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#2B2B2B] text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Brand / Logo on top */}
        <div className=" mb-10">
          <h2 className="text-white text-xl font-bold">Soudemy</h2>
        </div>

        {/* Footer sections in a row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* About Us */}
          <div>
            <h3 className="text-white font-semibold mb-3">About Us</h3>
            <p className="text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus
              vitae congue id ipsum sed neque et dui accumsan. Nibh semper magna
              facilisi ridiculus luctus amet. Aliquam
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">Useful</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Download product
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Download product
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Download product
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Download product
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Download product
                </a>
              </li>
            </ul>
          </div>

          {/* Download / Social */}
          <div>
            <h3 className="text-white font-semibold mb-3">Download</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Pinterest
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  YouTube
                </a>
              </li>
            </ul>
          </div>

          {/* Call Center */}
          <div>
            <h3 className="text-white font-semibold mb-3">Call Center</h3>
            <p className="text-sm leading-relaxed mb-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus
              vitae
            </p>
            <p className="text-sm">soroushnorozyui@gmail.com</p>
            <p className="text-sm">+1 333 555</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Soudemy. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
