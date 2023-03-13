import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
      <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
              <Image
                  width={250}
                  height={230}
                  className="max-w-sm rounded-lg shadow-2xl"
                  src={'/drupal-icon.png'}
                  alt={'drupal'}
              />
              <div>
                  <h1 className="text-5xl font-bold">Drupal docs</h1>
                  <p className="py-6">Provides simplified and accessible Drupal docs</p>
                  <Link href={"/document"}>
                    <button className="btn btn-primary">Get Started</button>
                  </Link>
              </div>
          </div>
      </div>
  )
}
