let Image = function(title, artist, date) {
    this.title = title;
    this.artist = artist;
    this.date = date;
};

Image.prototype.show = function() {
    console.log(`${this.title} (${this.artist}, ${this.date})`);
};

let images = {
    list: [],

    contains: function(title) {
        let retVal = false;
        for (let image of this.list) {
            if (image.title === title) {
                retVal = true;
                break;
            }
        }
        return retVal;
    },

    add: function(title, artist, date) {
        if (!this.contains(title)) {
            this.list.push(new Image(title, artist, date));
        }
    },

    show: function() {
        this.list.forEach(image => image.show());
    },

    clear: function() {
        this.list = [];
    }
};

images.edit = function(title, artist, date) {
    for (let image of this.list) {
        if (image.title === title) {
            image.artist = artist;
            image.date = date;
            break;
        }
    }
};

images.delete = function(title) {
    for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].title === title) {
            this.list.splice(i, 1);
            break;
        }
    }
};

images.add('Mona Lisa', 'Leonardo da Vinci', 1503);
images.add('The Last Supper', 'Leonardo da Vinci', 1495);
images.add('The Starry Night', 'Vincent van Gogh', 1889);

images.edit('Mona Lisa', 'Leonardo da Vinci', 1504);
images.delete('The Last Supper');

images.show();