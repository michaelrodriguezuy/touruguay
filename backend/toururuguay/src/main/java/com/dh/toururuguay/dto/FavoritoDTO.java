package com.dh.toururuguay.dto;

public class FavoritoDTO {
    
        private Integer favourite_id;
        private String user;
        private String product;
    
        public Integer getFavourite_id() {
            return favourite_id;
        }
    
        public void setFavourite_id(Integer favourite_id) {
            this.favourite_id = favourite_id;
        }
    
        public String getUser() {
            return user;
        }
    
        public void setUser(String user) {
            this.user = user;
        } 
    
        public String getProduct() {
            return product;
        }
    
        public void setProduct(String product) {
            this.product = product;
        }
    
        public FavoritoDTO(){
    
        }
    
        public FavoritoDTO(Integer favourite_id, String user, String product) {
            this.favourite_id = favourite_id;
            this.user = user;
            this.product = product;
        }
}
