package com.dh.toururuguay.dto;

public class FavoritoDTO {

    private Integer favouriteId;
    private Integer user;
    private Integer product;

    public Integer getFavouriteId() {
            return favouriteId;
        }

    public void setFavouriteId(Integer favouriteId) {
        this.favouriteId = favouriteId;
    }

    public Integer getUser() {
        return user;
    }

    public void setUser(Integer user) {
        this.user = user;
    }

    public Integer getProduct() {
        return product;
    }

    public void setProduct(Integer product) {
        this.product = product;
    }

    public FavoritoDTO(Integer favouriteId, Integer user, Integer product) {
        this.favouriteId = favouriteId;
        this.user = user;
        this.product = product;
    }

    public FavoritoDTO() {
    }

}
