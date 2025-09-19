import {
  TruckIcon,
  ShieldCheckIcon,
  ChatBubbleLeftRightIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Free Shipping',
    description:
      'Free shipping on orders over $50. Fast and reliable delivery to your doorstep.',
    icon: TruckIcon,
  },
  {
    name: 'Secure Payments',
    description:
      'Your payment information is secure with 256-bit SSL encryption.',
    icon: ShieldCheckIcon,
  },
  {
    name: '24/7 Support',
    description:
      'Get help when you need it with our round-the-clock customer support.',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: 'Easy Returns',
    description:
      'Not satisfied? Return your purchase within 30 days for a full refund.',
    icon: ArrowPathIcon,
  },
]

export default function Features() {
  return (
    <div className="bg-white py-12 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-400">
            Why Choose AIOutlet
          </h2>
          <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Shopping Made Simple
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto dark:text-gray-400">
            We provide the best shopping experience with cutting-edge technology
            and customer-first approach.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0 lg:grid-cols-4">
            {features.map(feature => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-primary-500 text-white dark:bg-primary-600">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                    {feature.name}
                  </p>
                </dt>
                <dd className="ml-16 mt-2 text-base text-gray-500 dark:text-gray-400">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
