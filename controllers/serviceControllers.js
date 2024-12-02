
import Service from '../models/serviceModel.js';
import ServicePriceOption from '../models/servicePrice.js';
import Category from '../models/categoryModel.js';

export const addServiceToCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { name, type, priceOptions } = req.body;
    
        // Validate input
        if (!name || !type || !priceOptions || !Array.isArray(priceOptions) || priceOptions.length === 0) {
          return res.status(400).json({ message: 'All fields (name, type, and priceOptions) are required' });
        }
    
        // Check if the category exists
        const category = await Category.findByPk(categoryId);
        if (!category) {
          return res.status(404).json({ message: 'Category not found' });
        }
    
        // Create the service
        const service = await Service.create({
          categoryId,
          name,
          type,
        });
    
        // Create price options for the service
        const priceOptionPromises = priceOptions.map(option =>
          ServicePriceOption.create({
            serviceId: service.id,
            duration: option.duration,
            price: option.price,
            type: option.type,
          })
        );
        
        // Wait for all price options to be created
        await Promise.all(priceOptionPromises);
    
        // Return the created service and associated price options
        res.status(201).json({
          message: 'Service added successfully',
          service,
          priceOptions,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          message: 'An error occurred while adding the service',
          error: error.message,
        });
      }
    };

export const getServicesInCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const services = await Service.findAll({ where: { categoryId }, include: [ServicePriceOption] });
    res.status(200).json({ services });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};

export const deleteServiceFromCategory = async (req, res) => {
  try {
    const { serviceId } = req.params;

    const result = await Service.destroy({ where: { id: serviceId } });
    if (!result) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { name, type, priceOptions } = req.body;

    const service = await Service.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    service.name = name || service.name;
    service.type = type || service.type;
    await service.save();

    if (priceOptions && Array.isArray(priceOptions)) {
      await ServicePriceOption.destroy({ where: { serviceId } });
      await Promise.all(priceOptions.map((option) => {
        return ServicePriceOption.create({
          serviceId: service.id,
          ...option,
        });
      }));
    }

    res.status(200).json({ message: 'Service updated successfully', service });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};
