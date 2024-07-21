const ProductSchema = require('../models/product');

class ProductServices {
    //getting products for landing home page based on categories;
    async getProducts() {
        try {
            const LatestCategory = await ProductSchema.find().sort({ _id: -1 }).limit(15);
            const NutrientsCategory = await ProductSchema.find({ category: 'Nutrients' }).limit(20);
            const ProteinCategory = await ProductSchema.find({ category: 'Whey Proteins' }).limit(20);
            const EnergyCategory = await ProductSchema.find({ category: 'Energy & Endurance' }).limit(15);
            const RecoveryCategory = await ProductSchema.find({ category: 'Recovery & Repair' }).limit(13);
            return {
                error: false, msg: 'Products Fetched Successfully', data: {
                    LatestCategory,
                    NutrientsCategory,
                    ProteinCategory,
                    EnergyCategory,
                    RecoveryCategory
                }
            }
        }
        catch (error) {
            return { error: true, msg: error.message }
        }
    }

    async getProductsList() {
        try {

            const ourProducts = await ProductSchema.find().sort({ id: 1 });
            let categoryCounts = {
                ProteinCategory : 0,
                EnergyCategory : 0,
                RecoveryCategory : 0,
                NutrientsCategory : 0,
            }
            let totalProducts ;
            const totalCategories = 4;

            const proteinQuery = { category: 'Whey Proteins' };
            categoryCounts.ProteinCategory = await ProductSchema.find(proteinQuery).count();

            const energyQuery = { category: 'Energy & Endurance' };
            categoryCounts.EnergyCategory = await ProductSchema.find(energyQuery).count();

            const repairQuery = { category: 'Recovery & Repair' };
            categoryCounts.RecoveryCategory = await ProductSchema.find(repairQuery).count();

            const nutrientsQuery = { category: 'Nutrients' };
            categoryCounts.NutrientsCategory = await ProductSchema.find(nutrientsQuery).count();

            totalProducts = ourProducts.length;

            return {
                error: false, msg: 'ProductsList Fetched Successfully', data: {
                    ourProducts,
                    categoryCounts, 
                    totalProducts,
                    totalCategories
                }
            }
        }
        catch (error) {
            return { error: true, msg: error.message }
        }
    }

    async deleteProduct(reqData) {
        try {
            const id = reqData.productId;
            const product = await ProductSchema.findByIdAndDelete(id);

            if (!product) {
                return { error: true, msg: 'Internal Server Error' }
            }

            return { error: false, msg: 'Product Deleted Successfully', data: product };
        }
        catch (error) {
            console.log("🚀 ~ ProductServices ~ deleteProduct ~ error:", error)
            return { error: true, msg: error.message }
        }
    }

    async getProductsSearchResult(reqData) {
        try {
            const filter = reqData.filter;
            const search = reqData.search;
            var searchResult;
            var searchResultCount;
            var searchQuery;
            if (filter == 'pricelow' || filter == "") {
                searchQuery = { name: { $regex: search, $options: 'i' } };
                searchResult = await ProductSchema.find(searchQuery).sort({ price: 1 });
                searchResultCount = searchResult.length;
            } else if (filter == 'pricehigh') {
                searchQuery = { name: { $regex: search, $options: 'i' } };
                searchResult = await ProductSchema.find(searchQuery).sort({ price: -1 });
                searchResultCount = searchResult.length;
            } else if (filter == 'energy') {
                searchQuery = { name: { $regex: search, $options: 'i' }, category: 'Energy & Endurance' };
                searchResult = await ProductSchema.find(searchQuery);
                searchResultCount = searchResult.length
            } else if (filter == 'nutrients') {
                searchQuery = { name: { $regex: search, $options: 'i' }, category: 'Nutrients' };
                searchResult = await ProductSchema.find(searchQuery);
                searchResultCount = searchResult.length;
            } else if (filter == 'repair') {
                searchQuery = { name: { $regex: search, $options: 'i' }, category: 'Recovery & Repair' };
                searchResult = await ProductSchema.find(searchQuery);
                searchResultCount = searchResult.length;
            } else {
                searchQuery = { name: { $regex: search, $options: 'i' }, category: 'Whey Proteins' };
                searchResult = await ProductSchema.find(searchQuery);
                searchResultCount = searchResult.length;
            }
            return {
                error: false, msg: 'Products Fetched Successfully', data: {
                    searchResult,
                    searchResultCount,
                    search,
                    filter
                }
            }
        } catch (error) {
            return { error: true, msg: error.message }
        }
    };

    async addProduct(reqData){
        try{
            if(!reqData.img){
                return {error:true, msg:'Image Parsing Error'};
            }

            const res = await ProductSchema.create(reqData);

            if(!res){
                return {error:true, msg:'Internal Server Error'};
            }

            return {error:false, msg:'Product added successfully', data:{}}
        } catch (error) {
            return { error: true, msg: error.message }
        }

    }

}

module.exports = new ProductServices();
 