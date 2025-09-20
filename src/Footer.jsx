import { Trophy, Shield, Truck, Headphones, BadgeCheck } from "lucide-react";
import { TbTruckDelivery} from "react-icons/tb" 
import {  MdSupportAgent } from  "react-icons/md"

const Footer = () => {
  const features = [
    {
      icon: Trophy,
      title: "High Quality",
      description: "crafted from top materials"
    },
    {
      icon: BadgeCheck,
      title: "Warranty Protection", 
      description: "Over 2 years"
    },
    {
      icon: TbTruckDelivery,
      title: "Free Shipping",
      description: "Order over 150 $"
    },
    {
      icon: Headphones,
      title: "24 / 7 Support",
      description: "Dedicated support"
    }
  ];

  return (
    <div className="bg-[#FAF3EA] py-16">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="flex items-start space-x-4">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <IconComponent 
                    size={60} 
                    className="text-black" 
                    strokeWidth={1.5}
                  />
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-[#242424] mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-[#898989] text-xl font-medium">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Footer;